import {
  CameraPhoto,
  CameraResultType,
  CameraSource,
  Capacitor,
  FilesystemDirectory,
} from "@capacitor/core";
import { isPlatform } from "@ionic/react";
import { useCamera } from "@ionic/react-hooks/camera";
import { useEffect, useState } from "react";
import { base64FromPath, useFilesystem } from "@ionic/react-hooks/filesystem";
import { useStorage } from "@ionic/react-hooks/storage";

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = "photos";

const usePhotoGallery = () => {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  get(PHOTO_STORAGE).then((item) => console.log(item));

  const takePhoto = async () => {
    const cameraPhoto: CameraPhoto = await getPhoto({
      //   source: CameraSource.Prompt,
      // source: CameraSource.Photos,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri,
    });

    const fileName = new Date().getTime() + ".jpeg";

    const newPhoto = await savePhoto(cameraPhoto, fileName);

    const newPhotos = [...photos, newPhoto];
    setPhotos(newPhotos);
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));
  };

  const savePhoto = async (
    photo: CameraPhoto,
    fileName: string
  ): Promise<Photo> => {
    if (isPlatform("hybrid")) {
      const file = await readFile({ path: photo.path! });
      const base64Data = file.data;

      const saveFile = await writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data,
      });

      return {
        filepath: saveFile.uri,
        webviewPath: Capacitor.convertFileSrc(saveFile.uri),
      };
    } else {
      const base64Data = await base64FromPath(photo.webPath!);
      const savedFile = await writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data,
      });
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  useEffect(() => {
    const loadPhotos = async () => {
      const photosString = await get(PHOTO_STORAGE);
      const photos = photosString ? JSON.parse(photosString) : [];

      for (const photo of photos) {
        const file = await readFile({
          path: photo.filepath,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
      setPhotos(photos);
    };
    loadPhotos();
  }, []);
  return { takePhoto, photos };
};

export { usePhotoGallery };
