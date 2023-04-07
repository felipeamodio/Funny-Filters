import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {styles} from './styles';

import {Camera, CameraType, FaceDetectionResult} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

export function Home(){
    const [faceDetected, setFaceDetected] = useState(false);
    //pedindo permissão pra usar a câmera
    const [permission, requestPermission] = Camera.useCameraPermissions();

    function handleFacesDetected({faces}: FaceDetectionResult){
        console.log(faces);
        const face = faces[0] as any;

        if(face){
            const {size, origin} = face.bounds;
            setFaceDetected(true);
        }else{
            setFaceDetected(false);
        }
    }
    
    useEffect(() => {
        requestPermission();
    }, []);

    if(!permission?.granted){
        return;
    }

    return(
        <View style={styles.container}>
            <Camera 
                style={styles.camera}
                type={CameraType.front}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                    runClassifications: FaceDetector.FaceDetectorClassifications.all,
                    minDetectionInterval: 100,
                    tracking: true,
                }}
            />
        </View>
    )
}