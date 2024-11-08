const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const payload = req.body;

  // 检查是否是推送到 main 分支
  if (payload.ref === 'refs/heads/main') {
    console.log('Push to main branch detected. Pulling and building...');

    // 拉取特定分支代码并构建
    exec('git pull origin main && npm install && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        res.status(500).send('Build failed');
        return;
      }

      console.log(`Build output: ${stdout}`);
      res.status(200).send('Build successful');
    });
  } else {
    res.status(200).send('Not a push to main branch');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});