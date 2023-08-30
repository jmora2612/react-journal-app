import { ImageList, ImageListItem } from "@mui/material";

export const ImagenGallery = ({images}) => {
  return (
    <ImageList  sx={{ width: 500, height: 500, }} cols={3} rowHeight={164}>
      {images.map((item) => (
        <ImageListItem key={item}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}