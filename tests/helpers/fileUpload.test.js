import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'db6zn23or',
    api_key:'644631856575911',
    api_secret:'dWuRPmu8nv8fJ0gIsAaJxTe_BFI',
    secure: true
})

describe('pruebas en fileUpload', () => { 
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const files = new File([blob], 'foto.jpg');

        const url = await fileUpload( files );
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length -1].replace('.jpg', '');

        const deleteImagen = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        })
     });

    
 })