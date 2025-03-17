
// 파일 타입 검증 함수
export const isValidFileType = (file: File) => {
  const acceptedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
  return acceptedTypes.includes(file.type);
};

// 파일 사이즈 검증 함수 (5MB)
export const isValidFileSize = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSize;
};

// 파일 아이콘 결정 함수
export const getFileIcon = (file: File) => {
  if (file.type === 'application/pdf') {
    return 'pdf';
  } else {
    return 'ppt';
  }
};
