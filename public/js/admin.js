const deletePost = (btn) => {
    const pstId = btn.parentNode.querySelector('[name=pstId]').value 

    fetch('/feed/post/' + pstId, {
        method: "DELETE",
    })
    .then(result => {
        return result.json()
    })
    .catch(err => {
        console.log(err)
    })
}
