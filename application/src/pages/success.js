import React from "react";
import UI from "@gh/ui";
import Button from "@/component/app/mainButton";
import Context from "@context";

export default function App(props) {
  const { r } = React.useContext(Context);
   
  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%" flex={1} center gap={2}>
      <UI.Text variant="h2">Registrasi Berhasil</UI.Text>
      <UI.Text variant="body1">Silahkan menunggu proses verifikasi dari admin</UI.Text>
      
      <UI.Text style={{borderTop:"solid 3px grey", color:"grey"}} variant="h6">Ikuti sosial media kita untuk mendapatkan info terbaru perihal MCGG ID Community Tournament II</UI.Text>
      
      <UI.Text style={{marginBottom: "10px"}} variant="body1" >

          <a style={{marginRight: "12px",padding: "10px", paddingTop: "50px", borderRadius:"20px" ,backgroundColor: "rgba(0,0,0,.2)"}} href="https://facebook.com/profile.php?id=61567078887192">
            <img height="53px" src="/assets/img/Facebook_Logo_Primary.png"></img>
          </a>

          <a style={{marginRight: "12px",padding: "10px", paddingTop: "50px", borderRadius:"20px" ,backgroundColor: "rgba(0,0,0,.2)"}} href="https://instagram.com/magicchessgogoid">
            <img height="53px" src="/assets/img/Instagram_logo_2022.svg"></img>
          </a>

          <a style={{marginRight: "12px",padding: "10px", paddingTop: "50px", borderRadius:"20px" ,backgroundColor: "rgba(0,0,0,.2)"}} href="https://tiktok.com/@playmagicchessgogoid">
            <img height="53px" src="/assets/img/tiktok-logo.svg"></img>
          </a>

          <a style={{marginRight: "12px",padding: "10px", paddingTop: "50px", borderRadius:"20px" ,backgroundColor: "rgba(0,0,0,.2)"}} href="https://x.com/MCGG_ID">
            <img height="53px" src="/assets/img/x-logo.svg"></img>
          </a>

          <a style={{padding: "10px", paddingTop: "50px", borderRadius:"20px" ,backgroundColor: "rgba(0,0,0,.2)"}} href="https://www.youtube.com/@MagicChessGoGoIDOfficial">
            <img height="53px" src="/assets/img/yt-logo.svg"></img>
          </a>
        {/* <table>
          <tr>
            <td>IG</td>
            <td>:</td>
            <td><a style={{color:"blue", textDecorationLine: 'underline'}} href="https://instagram.com/magicchessgogoid">instagram.com/magicchessgogoid</a></td>
          </tr>
          <tr>
            <td>TikTok</td>
            <td>:</td>
            <td><a style={{color:"blue", textDecorationLine: 'underline'}} href="https://tiktok.com/@playmagicchessgogoid">tiktok.com/@playmagicchessgogoid</a></td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td>:</td>
            <td><a style={{color:"blue", textDecorationLine: 'underline'}} href="https://facebook.com/profile.php?id=61567078887192">facebook.com/profile.php?id=61567078887192</a></td>
          </tr>
          <tr>
            <td>Youtube</td>
            <td>:</td>
            <td><a style={{color:"blue", textDecorationLine: 'underline'}} href="https://www.youtube.com/@MagicChessGoGoIDOfficial">www.youtube.com/@MagicChessGoGoIDOfficial</a></td>
          </tr>
          <tr>
            <td>x</td>
            <td>:</td>
            <td><a style={{color:"blue", textDecorationLine: 'underline'}} href="https://x.com/MCGG_ID">x.com/MCGG_ID</a></td>
          </tr>
        </table> */}
      </UI.Text>
      
      <Button onClick={() => r.push(`/events?id=${r.query.eid}`)}>Return</Button>
    </UI.Col>
  );
}
