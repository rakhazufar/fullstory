'use client'

import Image from "next/image"
import Logo from "@public/assets/images/Fullstory.svg"
import { Button, FormControl, InputLabel, OutlinedInput } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const Nav = () => {
  return (
    <nav className="navbar py-4">
        <Image src={Logo} width={120} className="cursor-pointer" />

        <div className="searchInput">
            {/* <TextField id="outlined-basic" inputProps={{
                endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
            }} label="Cari post atau user..." variant="outlined" /> */}
        <FormControl sx={{ mt: 1, width: '30vw'}} size="small" variant="outlined">
          <InputLabel htmlFor="Search...">Search...</InputLabel>
          <OutlinedInput
            id="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
          </FormControl>
        </div>

        <div className="Login flex gap-5">
            <Button variant="contained" color="primary" sx={ { borderRadius: 28 } }>Sign In</Button>
            <Button variant="outlined" color="primary" sx={ { borderRadius: 28 } }>Sign Up</Button>
        </div>
    </nav>
  )
}

export default Nav