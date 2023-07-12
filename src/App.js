
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import { auth, db, storage } from './firebase-config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc,updateDoc} from 'firebase/firestore';
import { async } from '@firebase/util';
import { uploadBytes, ref } from 'firebase/storage';


function App() {
  const [appleList, setAppleList] = useState ([])

  //New Product state

      const [newApple, setNewApple] = useState("")
      const [newStorage, setNewStorage] = useState("")
      const [newImage, setNewImage] = useState("")
      const [isNew, setIsNew] = useState(false)

      // Up date name state
      const [updatingName, setUpdatedName] = useState("")

       // File Upload State

      const [fileUpload, setFileUpload] = useState(null)
    

      const appleCollectionRef = collection(db, "apple")

      const getAppleList = async() => {
        try{
          const data = await getDocs( appleCollectionRef)
          const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
          setAppleList (filteredData)
        } catch (err) {
          console.error(err)
        }
      }
    useEffect(() => {
     
      getAppleList()
    }, [])
  

        const onSubmitProduct = async () => {
          try{
            await addDoc (appleCollectionRef, {name: newApple,
               image: newImage, storage: newStorage
          , new: isNew,
          userId: auth?.currentUser?.uid
        })
          getAppleList()
            }catch (err){
              console.error(err)
            }
        }
        const deleteProduct = async(id) => {
          const appleDoc = doc( db, "apple", id)
          await deleteDoc (appleDoc)
        }
        const updateName = async(id) => {
          const appleDoc = doc( db, "apple", id)
          await updateDoc (appleDoc, {name : updatingName})
        }
        const uploadFile = async () => {
        if (!fileUpload) return;
        const fileStorageRef = ref(storage, `fileStore/${fileUpload.name}`)

        try{
          await uploadBytes(fileStorageRef, fileUpload)
        } catch (err) {
          console.error(err)
        }
        
        }

  return (
    <div className="App">
      <Auth/>

      <div>
        <input placeholder='Apple name....' onChange={(e) => setNewApple(e.target.value)}/>
        <input placeholder='Storage....' onChange={(e) => setNewStorage(e.target.value)}/>
        <input placeholder='image....' onChange={(e) => setNewImage(e.target.value)} />
        <input type='checkbox' checked={isNew} onChange={(e) => setIsNew(e.target.checked)}/>
        <label>New</label>
        <button onClick={onSubmitProduct}>Submit Product</button>



      </div>

      <div>
        {appleList.map((apple)=> (
          <div>
            <h1 style={{color: apple.new ? "green" : "brown"}}>{apple.name}</h1>
            <p>Storage: {apple.storage}</p>
            {apple.image}
            <button onClick={() => {deleteProduct(apple.id)}}>Delete Product</button>
            <input placeholder='New name.....' onChange={(e)=> setUpdatedName(e.target.value)}/>
            <button onClick={() => updateName(apple.id)}>Update Name</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files)}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
