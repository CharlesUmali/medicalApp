const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Doctors = require("./Routes/Doctors");
const Patients = require("./Routes/Patients");
const Staff = require("./Routes/Staff");
const Appointments = require("./Routes/Appointments");

app.use(express.json());
app.use("/Doctors", Doctors);
app.use("/Patients", Patients);
app.use("/Staff", Staff);
app.use("/Appointments", Appointments);

app.get("/", (req, res) => {
    res.send("Hospital Database");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
