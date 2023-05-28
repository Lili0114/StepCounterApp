import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const StepCounterScreen = () => {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    let subscription;

    const startAccelerometer = async () => {
      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        if (magnitude > 1.1) {
          setSteps((prevSteps) => prevSteps + 1);
        }
      });
    };

    const stopAccelerometer = () => {
      subscription && subscription.remove();
    };

    startAccelerometer();

    return () => {
      stopAccelerometer();
    };
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 60, textAlign: 'center' }}>Step Counter</Text>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>Steps: {steps}</Text>
    </View>
  );
};

export default StepCounterScreen;
