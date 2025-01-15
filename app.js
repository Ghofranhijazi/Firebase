async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();


        renderProducts(data); //*
    }
    catch (error)
    {
       console.log("Error fetching products:" ,error);
    }
}

function renderProducts(products){
    const mainSection = document.getElementById('main-section');
    mainSection.innerHTML="";

    products.forEach(product => {
     const productCard = document.createElement('div');
     productCard.className = 'card';
     productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto;">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            <button onclick="updateProduct(${product.id})">Update</button>
     ` 
     mainSection.appendChild(productCard);  
    });
}
document.addEventListener('DOMContentLoaded', fetchProducts); // استدعاء الوظيفة عند تحميل الصفحة*

//form
const productForm = document.getElementById('product-form');
productForm.addEventListener('submit', async (e) => {
   e.preventDefault();

    const newProduct = {
        title: document.getElementById("title").value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
    };
    try {
        const response = await fetch('https://fakestoreapi.com/products',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });

       const createdProduct = await response.json();

       alert("Product created successfully!");
       fetchProducts()
    }
    catch(error)
    {
        console.error('Error creating product:', error);
    }
});


async function deleteProduct(id){
 try{
    await fetch('https://fakestoreapi.com/products/${id}',
    { method : 'DELETE'});
    alert("Product deleted successfully!");
    fetchProducts();
}
catch (error){
    console.error('Error deleting product:', error);
}
}
async function updateProduct(id){
    console.log("Updating product with ID:", id);
    const updatedProduct = {
        title:prompt("Enter new title"),
        price: prompt('Enter new price'),
        description: prompt('Enter new description'),
        image: prompt('Enter new image URL'),
    };
    // console.log("Updated product data:", updatedProduct);
    try{
        // const response = 
        await fetch('https://fakestoreapi.com/products/${id}',{
        method: 'PUT',
        body: JSON.stringify(updatedProduct),
    });
    //    const result = await response.json();
    //    console.log("Update response:", result);
       alert("Product updated successfully!");
       fetchProducts();
   }
   catch(error){
       console.error('Error updating product:', error);
   }
   };




  
//Add data //
   import { collection, addDoc } from "firebase/firestore"; 

   try {
     const docRef = await addDoc(collection(db, "products"), {
        title: title,
        price: price,
        description: description,
        image: image
     });
     console.log("Document written with ID: ", docRef.id);
   } catch (e) {
     console.error("Error adding document: ", e);
   }

   //Read data //
   import { collection, getDocs } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

// sign in //
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  // Signed up  //
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  import { getFirestore } from "firebase/firestore"; //*
  import { getAuth } from "firebase/auth"; //*
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBieMBUK-RasC4oxLmc4Y4w4lGk3LV9x8s",
    authDomain: "testproject-64c9b.firebaseapp.com",
    projectId: "testproject-64c9b",
    storageBucket: "testproject-64c9b.firebasestorage.app",
    messagingSenderId: "969937066792",
    appId: "1:969937066792:web:b6b8208cbc7c563a984e1d",
    measurementId: "G-KJX6PG1ND8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app); //*
  const auth = getAuth(app); //*
