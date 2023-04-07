import { View } from 'react-native';
import {styles} from './styles';

import {Camera} from 'expo-camera';

export function Home(){
    return(
        <View style={styles.container}>
            <Camera 
                style={styles.camera}
            />
        </View>
    )
}