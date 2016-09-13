// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var map = {}
        return fetch(url)
                .then(r => r.json())
                .then(r => r["articles"])
                .then(r => r.forEach(function(value){
                    map[value["_id"]] = value["text"].split(" ").length;
                }))
                .then(r => map)
                //.then(r => console.log(r["_id"]))
    }

    function countWordsSafe(url) {
        var map = {}
        return fetch(url)
                .then(r => r.json())
                .then(r => r["articles"])
                .then(r => r.forEach(function(value){
                    map[value["_id"]] = value["text"].split(" ").length;
                }))
                .then(r => map)
                .catch(r => new Promise((resolve, reject) => { resolve({}) }))
    }

    function getLargest(url) {
        var map = {}
        var max = -1;
        var maxId = 0;
        var len;
        return fetch(url)
                .then(r => r.json())
                .then(r => r["articles"])
                .then(r => r.forEach(function(value){
                    len = map[value["_id"]] = value["text"].split(" ").length;
                    if (len > max) {
                        max = len;
                        maxId = value["_id"];
                    }
                }))
                .then(r => "" + maxId)
    }
    exports.inclass = {
        author: "Ziyun Wang",
        countWords, countWordsSafe, getLargest
    }

})(this);
