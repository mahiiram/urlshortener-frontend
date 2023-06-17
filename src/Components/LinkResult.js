import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

function LinkResult({ inputvalue }) {

  const [shortenLink, setShortenLink] = useState("")

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputvalue}`);
       console.log(res.data.result.full_short_link2)
      setShortenLink(res.data.result.full_short_link2);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
     
  }

  useEffect(() => {
    if (inputvalue.length) {
      fetchData()
    }
  }, [inputvalue])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied])

  if (loading) {
    return <p className='nodata'>Loading...</p>
  }
  if (error) {
    return <p className='nodata'>something went wrong...</p>
  }
  return (
    <>
      {shortenLink && (
        <div className='result'>
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
      )}

    </>

  )
}

export default LinkResult