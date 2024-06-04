const mqtt = require("mqtt");
const mysql = require("mysql2");

// MQTT Broker settings
const mqttBroker = "mqtt://192.168.1.9:2002";
const mqttOptions = {
    username: "admin",
    password: "123",
};
const mqttDataTopic = "data";
const mqttDeviceTopicD6 = "device/D6";
const mqttDeviceTopicD7 = "device/D7";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "20052002",
    database: "iotdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: ", err);
        return;
    }
    console.log("Connected to MySQL database");
});

const client = mqtt.connect(mqttBroker, mqttOptions);

client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(mqttDataTopic);
    client.subscribe(mqttDeviceTopicD6);
    client.subscribe(mqttDeviceTopicD7);
});

client.on("message", (topic, message) => {
    if (topic === mqttDataTopic) {
        
        const data = JSON.parse(message);
        const { Temperature: temperature, Humidity: humidity, Light: light_intensity } = data;

        const query =
        "INSERT INTO sensor (id, temperature, humidity, brightness, datetime) VALUES (NULL, ROUND(?,2), ?, ?, NOW())";
        
        const values = [temperature, humidity, light_intensity];

        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.error("Error inserting data into MySQL: ", error);
            } else {
                console.log("Data inserted into MySQL");
            }
        });
    } 
    // else if (topic === mqttDeviceTopicD6 || topic === mqttDeviceTopicD7) {
    //     // Handle device status update
    //     const device = topic === mqttDeviceTopicD6 ? "ledD6" : "ledD7";
    //     const mode = message.toString();

    //     const updateQuery = "INSERT INTO action (id, device, mode, datetime) VALUES (NULL, ?, ?, NOW())";
    //     const updateValues = [device, mode];

    //     connection.query(updateQuery, updateValues, (error, results, fields) => {
    //         if (error) {
    //             console.error("Error updating device status in MySQL: ", error);
    //         } else {
    //             console.log("Device status updated in MySQL");
    //         }
    //     });
    // }
});

client.on("error", (err) => {
    console.error("MQTT error:", err);
});

connection.on("error", (err) => {
    console.error("MySQL error:", err);
});

module.exports = client;

