// src/app/utils/file-utils.ts

export class ConvertImgUtils {
    static toBase64WithType(file: File): Promise<{ base64: string, type: string }> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            resolve({
              base64: reader.result as string,
              type: file.type
            });
          };   
          reader.onerror = (error) => reject(error);
    
          reader.readAsDataURL(file);
        });
      }
  }
  