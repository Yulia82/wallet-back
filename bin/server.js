const app = require("../app")
const { PORT, HOST } = require("../config/dotenv-config")

app.listen(PORT, HOST, () => {
	console.log(`Server running. Use our API on port: http://${HOST}:${PORT}`)
})

//*after add db open this part of code
// db.then(() => {
//   app.listen(PORT, HOST, async () => {
//     console.log(`Server running. Use our API on http://${HOST}:${PORT}`);
//   });
// }).catch((e) => {
//   console.log(`Server not run ${e.message}`);
// });
