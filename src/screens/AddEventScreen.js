import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';

const AddEventScreen = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Dialog
        visible={visible}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <DialogContent>
          <Text>testing data</Text>
        </DialogContent>
      </Dialog>
    </View>
  );
};
export default AddEventScreen;
