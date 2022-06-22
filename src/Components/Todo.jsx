import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

//I have all data in orders collection so i will target using this
const collRef = collection(db, "orders");

//If you Make CRUD in this component you need to fetch the data gain
//But firebase gives a realtime data base option it call every time if you make any changes in db
//for this see RealTimeComponent

export const Todo = () => {
  const [task, setTask] = useState([]);
  const [newTask, setName] = useState("");
  //Get Request
  const fetchDataFromFirebase = async () => {
    const res = await getDocs(collRef);
    // console.log(res.docs); it return documnet
    let data = [];
    try {
      //collect all data and push it in data []
      res.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      console.log(data);
      setTask(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //POST Request
  const addTaskPOSTrequestInFirebase = async () => {
    try {
      let post = await addDoc(collRef, { name: newTask });
      fetchDataFromFirebase();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTaskFromFirebase = async (id) => {
    //delete and update need doc function and take three arguments
    // first is db, second collection name thir id of particular documnet
    const docRef = doc(db, "orders", id);
    try {
      let deletereq = await deleteDoc(docRef);
      fetchDataFromFirebase();
    } catch (e) {
      console.log(e.message);
    }
  };

  //PUT request Update a
  const updateTaskinFirebase = async (id) => {
    let value = prompt();
    const docRef = doc(db, "orders", id);
    try {
      let res1 = await updateDoc(docRef, {
        name: value
      });
      fetchDataFromFirebase();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p>Learn Firebase CRUD In Todo Component</p>
      <button onClick={fetchDataFromFirebase}>Fetch Data</button>
      <div>
        <input onChange={(e) => setName(e.target.value)} type="text" />
        <button onClick={addTaskPOSTrequestInFirebase}>Add Task</button>
      </div>
      {task.map((el, i) => (
        <div className="item-cont" key={i}>
          <p>
            {i + 1}. {el.name}
          </p>
          <button
            onClick={() => {
              deleteTaskFromFirebase(el.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              updateTaskinFirebase(el.id);
            }}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export const RealTimeDbFromFirebase = () => {
  //in this component all above code is same just a added onSnapshot in useEffect and deleted all fetch invoke
  //even if you update data in above component this component updated on their own
  const [task, setTask] = useState([]);
  const [newTask, setName] = useState("");

  useEffect(() => {
    fetchDataFromFirebase();

    //this is eventLister it call if there database is changed no need to call us
    //fetch everytime from ourside
    onSnapshot(collRef, (snap) => {
      let data = [];
      try {
        snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        setTask(data);
      } catch (error) {
        console.log(error.message);
      }

      console.log(data);
    });
  }, []);
  //Get Request
  const fetchDataFromFirebase = async () => {
    const res = await getDocs(collRef);
    // console.log(res.docs); it return documnet
    let data = [];
    try {
      //collect all data and push it in data []
      res.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      console.log(data);
      setTask(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //POST Request
  const addTaskPOSTrequestInFirebase = async () => {
    try {
      let post = await addDoc(collRef, { name: newTask });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTaskFromFirebase = async (id) => {
    //delete and update need doc function and take three arguments
    // first is db, second collection name thir id of particular documnet
    const docRef = doc(db, "orders", id);
    try {
      let deletereq = await deleteDoc(docRef);
    } catch (e) {
      console.log(e.message);
    }
  };

  //PUT request Update a
  const updateTaskinFirebase = async (id) => {
    let value = prompt();
    const docRef = doc(db, "orders", id);
    try {
      let res1 = await updateDoc(docRef, {
        name: value
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p>This is The realtime Database Component</p>
      <p>No Need to fetch the data if you made any changes</p>
      <div>
        <input onChange={(e) => setName(e.target.value)} type="text" />
        <button onClick={addTaskPOSTrequestInFirebase}>Add Task</button>
      </div>
      {task.map((el, i) => (
        <div className="item-cont" key={i}>
          <p>
            {i + 1}. {el.name}
          </p>
          <button
            onClick={() => {
              deleteTaskFromFirebase(el.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              updateTaskinFirebase(el.id);
            }}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};
