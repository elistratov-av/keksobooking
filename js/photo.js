const noticeForm = document.querySelector('.ad-form');
const fileChooser = noticeForm.querySelector('#images');
const preview = noticeForm.querySelector('.ad-form__photo');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileType = file.type.toLowerCase();

  const matches = fileType.startsWith('image/');

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });

    reader.readAsDataURL(file);
  }
});

const resetPhoto = () => {
  preview.style.backgroundImage = null;
};

export { resetPhoto };
