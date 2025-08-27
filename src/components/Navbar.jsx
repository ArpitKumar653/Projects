const Navbar = () => {
  return (
    <nav className='bg-violet-500 text-white flex justify-around items-center '>
        <span className="font-bold text-2xl pl-5">iTask</span>
        <div className="links flex gap-5 px-5">
          <h2 className="hover:cursor-pointer">Home</h2>
          <h2 className="hover:cursor-pointer">YourTodos</h2>
        </div>

    </nav>
  )
} 

export default Navbar
