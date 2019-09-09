const sendButton = document.querySelector('#send-button');

sendButton.addEventListener('click', e => {
  e.preventDefault();
  sendFile();
});

const sendFile = () => {
  const formData = new FormData();
  const file = document.getElementById('list-file');
  formData.append('list', file.files[0]);

  axios
    .post('/results', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      setListLink(res.data.fileUrl);
      setList(res.data.attendees);
    })
    .catch(err => setError(err));
};

const setList = list => {
  const listEl = document.getElementById('attendees-list');
  listEl.innerHTML = '';

  if (list.length === 0) {
    const li = document.createElement('li');
    const emptyListContent = document.createTextNode(
      'There are no possible attendees'
    );
    li.appendChild(emptyListContent);
    listEl.appendChild(li);
  }

  list.forEach(attendee => {
    const li = document.createElement('li');
    const listItemContent = document.createTextNode(
      `Id : ${attendee.user_id} - Name : ${attendee.name}`
    );
    li.appendChild(listItemContent);
    listEl.appendChild(li);
  });
};

const setListLink = fileUrl => {
  const listContainer = document.getElementById('list');
  const currentLink = document.querySelectorAll('#list a');
  if (currentLink.length > 0) currentLink[0].remove();

  if (fileUrl === null) return;

  const link = document.createElement('a');
  const linkLabel = document.createTextNode('Download list');

  link.appendChild(linkLabel);
  link.href = fileUrl;

  listContainer.prepend(link);
};

const setError = err => {
  const msgError = err.response.data.error;
  const listEl = document.getElementById('attendees-list');
  const li = document.createElement('li');

  listEl.innerHTML = '';

  const emptyListContent = document.createTextNode(msgError);
  li.appendChild(emptyListContent);
  listEl.appendChild(li);
};
