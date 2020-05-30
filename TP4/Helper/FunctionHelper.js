import sha1 from 'sha1';

function GenerateId() {
    let hash = sha1(Math.random()).toString();
    return hash;
}

export default{
    GenerateId
}