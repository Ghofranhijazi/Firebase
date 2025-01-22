import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEFvhYh4LXIN1VFcZqt7nqrPrJAjyvW2A",
  authDomain: "testt-aaee5.firebaseapp.com",
  projectId: "testt-aaee5",
  storageBucket: "testt-aaee5.firebasestorage.app",
  messagingSenderId: "215738953671",
  appId: "1:215738953671:web:774d128508bc88598033e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendData(event) {
  event.preventDefault(); // تصحيح الخطأ الإملائي
  const title = document.getElementById("titleProduct").value;
  const img = document.getElementById("imgProduct").value;
  const price = document.getElementById("priceProduct").value;
  const description = document.getElementById("descProduct").value;

  try {
    const docRef = await addDoc(collection(db, "products"), {
      title: title,
      price: price,
      img: img,
      description: description,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// ربط الحدث بعد تعريف الدالة
document.getElementById("productForm").addEventListener("submit", sendData);

async function displayData() {
  const cardContainer = document.getElementById("card");
  cardContainer.innerHTML = ""; // تفريغ المحتوى السابق

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const cardHTML = `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text fw-bold">Price: $${product.price}</p>
            <div class="d-flex justify-content-between">
           <button class="btn btn-warning btn-sm edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
    cardContainer.innerHTML += cardHTML; // إلحاق العنصر بالسلسلة
  });

}

// استدعاء الدالة لعرض البيانات عند تحميل الصفحة
displayData();
