$('#add-course-tab').steps({
    onFinish: function () {
      alert('Wizard Completed');
    }
  });
function stopDefAction(evt) {
evt.preventDefault();
}