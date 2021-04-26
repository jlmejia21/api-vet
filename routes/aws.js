const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');

const SESConfig = {
    apiVersion: '2021-040-19',
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION
};
const ses = new AWS.SES({
    apiVersion: '2021-040-19',
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION
});
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const key = formatDateYYYMMddHHMMSS(new Date()) + req.files.image.name;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.files.image.data
    };
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
        Bucket: process.env.AWS_BUCKET_NAME,
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
        Bucket: process.env.AWS_BUCKET_NAME,
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

// EMAIL
router.post('/email', (req, res) => {
    const {
        idorden,
        toEmail
    } = req.body;
    let trData = '',
        total = 0;
    const productos = [{
        nombre: 'Producto 1',
        cantidad: 10,
        precio: 5.5,
        subtotal: 55
    }];
    productos.map(producto => {
        total += producto.subtotal;
        trData += getTr(producto);
    });
    const dataHtml = getDataHtml(trData, total);
    const params = setParamsEmail(toEmail, dataHtml, idorden);
    new AWS.SES(SESConfig).sendEmail(params).promise().then((response) =>
        res.json({
            status: 'send email successfully!!!'
        }), (err) => {
            console.log(err);
            res.json({
                status: 'doesn`t send email successfully!!!'
            });
        })
});

router.post('/emailv2', (req, res) => {
    var ses_mail = "From: 'AWS Tutorial Series' <" + 'joseluismejiarojas@gmail.com' + ">\n";
    ses_mail = ses_mail + "To: " + 'joseluismejiarojas@gmail.com' + "\n";
    ses_mail = ses_mail + "Subject: AWS SES Attachment Example\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "This is the body of the email.\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/plain;\n";
    ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
    ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
    ses_mail = ses_mail + "--NextPart--";

    var params = {
        RawMessage: {
            Data: new Buffer.from(ses_mail)
        },
        Destinations: ['joseluismejiarojas@gmail.com'],
        Source: "'AWS Tutorial Series' <" + 'joseluismejiarojas@gmail.com' + ">'"
    };

    ses.sendRawEmail(params, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

function getTr(producto) {
    let trData = ''
    trData += '<tr>';
    trData += `<td>${producto.nombre}</td>`;
    trData += `<td style="text-align: center;">${producto.cantidad}</td>`;
    trData += `<td style="text-align: right;">${producto.precio} </td>`;
    trData += `<td style="text-align: right;">${producto.subtotal} </td>`;
    trData += '</tr>';
    return trData
}

function getDataHtml(trData, total) {
    let dataHtml = ''
    dataHtml += '<style> table, td, th {  border: 1px solid black;}table {width: 100%;border-collapse: collapse;} </style>';
    dataHtml += '<h3>Se registro correctamente su orden de compra.</h3>';
    dataHtml += '<br>';
    dataHtml += '<table>';
    dataHtml += '<tr><th>PRODUCTO</th><th>CANTIDAD</th><th>PRECIO</th><th>SUBTOTAL</th></tr>';
    dataHtml += trData;
    dataHtml += '</table>';
    dataHtml += '<br>';
    dataHtml += `<div style="text-align: right;"><b>TOTAL : ${total} </b   ></div>`;
    return dataHtml;
}

function setParamsEmail(toEmail, dataHtml, idorden) {
    return {
        Source: 'SysVet<joseluismejiarojas@gmail.com>',
        Destination: {
            ToAddresses: [toEmail]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: dataHtml
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `ORDEN # ${idorden}`
            }
        }
    };
}

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