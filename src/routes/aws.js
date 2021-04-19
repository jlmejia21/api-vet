const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const ID = 'AKIA4CEBQET7LCVUY4NG';
const SECRET = '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';
const BUCKET_NAME = 'bucket-api-vet-productos';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    // signatureVersion: 'v4',
    // region: 'us-east-2',
});


router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const key = formatDateYYYMMddHHMMSS(new Date()) + req.files.image.name;
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: req.files.image.data
    };
    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
    res.json({
        status: 'File uploaded  successfully!!!',
        id: key
    });
});

router.get('/image/:id', (req, res) => {
    const type = req.query.type;
    const {
        id
    } = req.params;
    s3.getObject({
        Bucket: BUCKET_NAME,
        Key: id
    }, (error, data) => {
        if (error) {
            console.log(error);
        }
        res.writeHead(200, {
            "Content-Type": "image/png"
        });
        res.write(data.Body);
        res.end();
    });

});
router.delete('/image/:id', (req, res) => {
    const {
        id
    } = req.params;
    s3.deleteObject({
        Bucket: BUCKET_NAME,
        Key: id
    }, (error, data) => {
        if (error) {
            console.log(error);
        }

    });
    res.json({
        status: 'File deleted  successfully',
        id: key
    });

});

function formatDateYYYMMddHHMMSS(d) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hour.length < 2)
        hour = '0' + hour;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (seconds.length < 2)
        seconds = '0' + seconds;
    return [year, month, day].join('') + '' + [hour, minutes, seconds].join('');
}


module.exports = router;