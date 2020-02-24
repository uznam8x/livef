export default (message, done) => {
    console.log(message);
    done(null, message);
}