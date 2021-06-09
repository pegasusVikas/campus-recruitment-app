let json={
    _id:"131578",
    "title":"Front-end dev",
    "description":"adgsbdfaadgsfndgfsdsgdaffdgfhdghff gdfshgdhfddafdgdhafdgsfhdgfdafghdfshgd",
    "salary":14,
    "solt":6,
    "company":{
        "uri":"https://miro.medium.com/max/720/1*p8SGPFKYcbRWKfdj50wNxQ.png",
        "url":"https://medium.com/marketing-and-entrepreneurship/11-free-tools-for-making-your-own-logo-for-your-brand-d373b66b3738",
        "companyName":"Pegasus"
    },
    "deadline":new Date(),
    schoolPercentage:79,
    interPercentage:80,
    btechPercentage:90,
}
require('fs').writeFileSync("job.json",JSON.stringify(json));