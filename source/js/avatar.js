const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

const noticeForm = document.querySelector('.ad-form');
const fileChooser = noticeForm.querySelector('#avatar');
const preview = noticeForm.querySelector('.ad-form-header__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileType = file.type.toLowerCase();

  const matches = fileType.startsWith('image/');

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const resetAvatar = () => {
  preview.src = DEFAULT_AVATAR_IMAGE;
};

export { resetAvatar };
