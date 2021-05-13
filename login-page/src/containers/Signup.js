import React, { useState } from "react";
import Form from "react-bootstrap/Form";
//import View from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import RadioButton from '../components/RadioButton.js';
import { View, StyleSheet } from 'react-native';

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setPasswordAgain] = useState("");
    //radio buttons
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    const options = [
        {
            key: 'employee',
            text: 'Employee',
        },
        {
            key: 'employer',
            text: 'Employer',
        },
    ];
    const [selectedOption, setSelectedOption] = React.useState(null);
    const onSelect = (item) => {
        if (selectedOption && selectedOption.key === item.key) {
          setSelectedOption(null);
        } else {
          setSelectedOption(item);
        }
      };
      const onSubmit = () => {
        console.log(selectedOption);
      }

    function validateForm() {
      return email.length > 0 && password.length > 0 && verifyPassword.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
      
  
    return (
      <div className="Registration">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={verifyPassword}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </Form.Group>
          <p id="roleQuestion">What describes your role?</p>
          <View style={styles.container}>
        <RadioButton
        selectedOption={selectedOption}
        onSelect={onSelect}
        options={options}
      />
      {/* <Button title="SUBMIT" onPress={onSubmit} /> */}
    </View>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Complete Registration
          </Button>
        </Form>
      </div>
    );
  }