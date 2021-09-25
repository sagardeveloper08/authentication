client
        .verify
        .services(serviceId)
        .verifications
        .create({
            to: phone,
            message: message
        })
        .then(data => {
            res.status(200).send({
                message: "Verification is sent!!",
                phone: req.body.phone,
                data
            })
        })