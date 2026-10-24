const userProfile = {
  name: "Yernar Kuanyshbek",
  birthYear: 2007,
  isDeveloper: true,
  hobbies: ["Chess", "Programming", "Table tennis"]
};

const currentYear = new Date().getFullYear();
const profileForm = document.getElementById("profile-form");
const usernameInput = document.getElementById("username");
const birthYearInput = document.getElementById("birth-year");
const profileMessage = document.getElementById("profile-message");
const hobbyForm = document.getElementById("hobby-form");
const hobbyInput = document.getElementById("new-hobby");
const hobbyList = document.getElementById("hobby-list");
const removeButton = document.getElementById("remove-item");
const hobbyMessage = document.getElementById("hobby-message");

birthYearInput.max = currentYear;

function showProfile() {
  const age = currentYear - userProfile.birthYear;
  const hobbiesCount = userProfile.hobbies.length;

  document.getElementById("profile-name").textContent = userProfile.name;
  document.getElementById("profile-year").textContent = userProfile.birthYear;
  document.getElementById("profile-age").textContent = age;
  document.getElementById("profile-developer").textContent = userProfile.isDeveloper ? "Yes" : "No";
  document.getElementById("hobby-count").textContent = hobbiesCount;
  console.log("Profile:", userProfile);
  console.log("Age:", age, "Total hobbies:", hobbiesCount);
}

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = usernameInput.value.trim();
  const birthYear = Number(birthYearInput.value);

  if (name === "" || !Number.isInteger(birthYear) || birthYear < 1900 || birthYear > currentYear) {
    profileMessage.textContent = "Enter a name and a valid birth year.";
    return;
  }

  userProfile.name = name;
  userProfile.birthYear = birthYear;
  showProfile();
  profileMessage.textContent = "Profile updated successfully.";
});

function addListItem(hobby) {
  const item = document.createElement("li");
  item.textContent = hobby;
  hobbyList.appendChild(item);
}

hobbyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const hobby = hobbyInput.value.trim();
  if (hobby === "") {
    hobbyMessage.textContent = "Enter a hobby first.";
    return;
  }

  userProfile.hobbies.push(hobby);
  addListItem(hobby);
  showProfile();
  removeButton.disabled = false;
  hobbyMessage.textContent = "Added: " + hobby;
  hobbyInput.value = "";
  hobbyInput.focus();
});

removeButton.addEventListener("click", function () {
  if (userProfile.hobbies.length === 0) return;
  const removedHobby = userProfile.hobbies.pop();
  hobbyList.lastElementChild.remove();
  showProfile();
  hobbyMessage.textContent = "Removed: " + removedHobby;
  removeButton.disabled = userProfile.hobbies.length === 0;
});

userProfile.hobbies.forEach(addListItem);
showProfile();
