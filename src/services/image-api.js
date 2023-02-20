import axios from "axios";

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '32335865-69b3ae51a78e79767c682fcdb',
    image_type: 'photo',
    orientation: 'horizontal',
  }
})

export const searchImg = async(nameImg, page) => {
  const {data} =  await instance.get( '/', {
    params: {
      q: nameImg,
      page,
      per_page: 12,

    }
  }
  )

  return data;
}