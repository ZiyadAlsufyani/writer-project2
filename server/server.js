const express = require('express');
const path = require('path');
const rti = require('rticonnextdds-connector');
const app = express();
const bodyParser = require('body-parser');

const configFile = path.join(__dirname, 'QSystem.xml');
const PORT = 5000;

app.use(bodyParser.json());

app.post('/write', async (req, res) => {
  const { fromDevice, toDevice, orderNum } = req.body;
  console.log(req.body)

  const connector = new rti.Connector('MyParticipantLibrary::MyPubParticipant', configFile);
  const output = connector.getOutput('MyPublisher::MySquareWriter');

  try {
    console.log('Waiting for subscriptions...');
    await output.waitForSubscriptions();

    console.log('Writing...');
    output.instance.setString('fromDevice', fromDevice);
    output.instance.setString('toDevice', toDevice);
    output.instance.setNumber('orderNum', orderNum);
    output.write();

    res.status(200).send('Data written successfully');
  } catch (err) {
    console.error('Error encountered:', err);
    res.status(500).send('Failed to write data');
  } finally {
    connector.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});