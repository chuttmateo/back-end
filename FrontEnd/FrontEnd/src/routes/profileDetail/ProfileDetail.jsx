const ProfileDetail = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <>
        <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#1E1E1E' }}>
      <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <p style={{ margin: '0', flex: 1 }}>Nombre</p>
        <p style={{ margin: '0', flex: 1 }}>Apellido</p>
        <p style={{ margin: '0', flex: 1 }}>Email</p>
      </article>
      <article style={{ backgroundColor: 'grey', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <p style={{ margin: '0', flex: 1 }}>{userData.firstname}</p>
        <p style={{ margin: '0', flex: 1 }}>{userData.lastname}</p>
        <p style={{ margin: '0', flex: 1 }}>{userData.username}</p>
      </article>
    </main>
        </>
    )
}

export default ProfileDetail