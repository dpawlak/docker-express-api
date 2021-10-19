const deletePost = (btn) => {
    const pstId = btn.parentNode.querySelector('[name=pstId]').value 
    fetch('/feed/post/' + pstId, {
        method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch(err => {
        console.log(err)
    })
}
