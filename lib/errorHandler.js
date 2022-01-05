export default function errorHandler(err, req, res, next) {
  console.log(`🤖 Something Went Wrong!
  Error: ${err.name}
  `)
  console.log(err.stack)

  if (err.name === 'NotFound' || err.name === 'CastError') {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json(customErrors)
  }

  res.sendStatus(500)
  next(err)
}