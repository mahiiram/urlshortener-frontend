///convert image into base64 format so weed to save in mongodb document;


export default function convertTobase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) =>{
            reject(error)
        }
    })
}