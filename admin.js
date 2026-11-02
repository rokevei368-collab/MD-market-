
const STORAGE_KEY = "localServices";

// সার্ভিসের তথ্য লোড
let services = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

let editIndex = -1;

// তথ্য সংরক্ষণ
function saveServices() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(services)
  );
  showServices();
}

// নতুন সার্ভিস যোগ
function addService(name, category, area, phone) {
  if (!name || !category || !area || !phone) {
    alert("সব তথ্য পূরণ করুন");
    return;
  }

  services.push({
    id: Date.now(),
    name,
    category,
    area,
    phone
  });

  saveServices();
  alert("নতুন সার্ভিস যোগ হয়েছে");
}

// সার্ভিস এডিট
function updateService(id, newData) {
  const index = services.findIndex(
    service => service.id === id
  );

  if (index === -1) return;

  services[index] = {
    ...services[index],
    ...newData
  };

  saveServices();
  alert("তথ্য পরিবর্তন হয়েছে");
}

// সার্ভিস ডিলিট
function deleteService(id) {
  if (!confirm("আপনি কি মুছে ফেলতে চান?")) return;

  services = services.filter(
    service => service.id !== id
  );

  saveServices();
  alert("সার্ভিস মুছে ফেলা হয়েছে");
}

// সব সার্ভিস দেখানো
function showServices() {
  const list = document.getElementById("serviceList");

  if (!list) return;

  list.innerHTML = "";

  services.forEach(service => {
    const item = document.createElement("div");
    item.textContent =
      `${service.name} | ${service.category} | ${service.area} | ${service.phone}`;

    list.appendChild(item);
  });
}

// পেজ চালু হলে তালিকা দেখাবে
document.addEventListener("DOMContentLoaded", showServices);
