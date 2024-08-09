import React , { useEffect, useState}from 'react'
import { generateCommitment } from "zk-merkle-tree";
import QRCode from "qrcode";

function Register() {
    
    const [qrCodedImg, setQrCodedImg] = useState(null);
    const [commitment, setCommitment] = useState(null)

    useEffect(() => {
        init();
    },[])

    const init = async () => {
    
            var commit = JSON.parse(
              localStorage.getItem("zktree-vote-commitment")
            );
            console.log(commit, 'commit')
            setCommitment(commit)
            if (!commit) {
                commit = await generateCommitment();
              localStorage.setItem(
                "zktree-vote-commitment",
                JSON.stringify(commit)
              );
            }
            const qrcodeDataUrl = await QRCode.toDataURL(commit.commitment);
            setQrCodedImg(qrcodeDataUrl);
    }

    const copyToClipboard =() => {
        navigator.clipboard.writeText(commitment.commitment)
        alert("Successfully copied to the clipboard");
      }
    
    const resetCommitment = () => {
        localStorage.removeItem("zktree-vote-commitment");
        init();
      }

  return (
    <div>Register</div>
  )
}

export default Register