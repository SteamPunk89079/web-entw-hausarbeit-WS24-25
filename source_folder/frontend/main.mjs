// Initialize the map
const map = L.map('map').setView([49.7596208, 6.6441878], 13);
const popup = L.popup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Helper function to get the selected radio button value
function getCheckedValue (radioButtons) {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return null;
}

function saveLocation (e) {
  const locationName = document.getElementById('location_name').value;
  const radioButtons = document.getElementsByName('public_private');

  const selectedValue = getCheckedValue(radioButtons);

  if (locationName && selectedValue) {
    const new_location = {
      name: locationName,
      type: selectedValue,
      coordinates: { lat: e.latlng.lat, lng: e.latlng.lng }
    };

    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
      .bindPopup(`
                <b>${locationName}</b><br>Type: ${selectedValue}<br>
                <button id="edit_location_${e.latlng.lat}_${e.latlng.lng}">Edit</button>
            `)
      .openPopup();

    document.getElementById(`edit_location_${e.latlng.lat}_${e.latlng.lng}`).addEventListener('click', () => {
      editLocation(new_location, marker);
    });
  } else {
    alert('Please fill out all fields before saving.');
  }
}

function editLocation (location, marker) {
  const editForm = `
        <label for="edit_location_name">Name:</label>
        <input type="text" id="edit_location_name" value="${location.name}">
        <br>
        <label>Type:</label>
        <input type="radio" name="edit_public_private" value="Offentlich" ${location.type === 'Offentlich' ? 'checked' : ''}> Offentlich
        <input type="radio" name="edit_public_private" value="Privat" ${location.type === 'Privat' ? 'checked' : ''}> Privat
        <br>
        <button id="save_edit_location">Save</button>
        <button id='cancel_edit_location'>Cancel</button>
    `;

  marker.getPopup().setContent(editForm).openOn(map);

  document.getElementById('save_edit_location').addEventListener('click', () => {
    const newName = document.getElementById('edit_location_name').value;
    const newType = getCheckedValue(document.getElementsByName('edit_public_private'));

    if (newName && newType) {
      location.name = newName;
      location.type = newType;

      marker.bindPopup(`
                <b>${location.name}</b><br>Type: ${location.type}<br>
                <button id="edit_location_${location.coordinates.lat}_${location.coordinates.lng}">Edit</button>
            `).openPopup();

      alert('Location updated successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  });

  document.getElementById('cancel_edit_location').addEventListener('click', () => {
    marker.bindPopup(`
            <b>${location.name}</b><br>Type: ${location.type}<br>
            <button id="edit_location_${location.coordinates.lat}_${location.coordinates.lng}">Edit</button>
        `).openPopup();
  });
}

function onMapClick (e) {
  popup
    .setLatLng(e.latlng)
    .setContent(`
            <input type="text" id="location_name" placeholder="Name">
            <form>
                <input type="radio" id="public_event" name="public_private" value="Offentlich">
                <label for="public_event">Offentlich</label><br>
                <input type="radio" id="private_event" name="public_private" value="Privat">
                <label for="private_event">Privat</label><br>
            </form>
            <button id="save_location_button">Add Location</button>
        `)
    .openOn(map);

  document.getElementById('save_location_button').addEventListener('click', () => saveLocation(e));
}

map.on('click', onMapClick);
