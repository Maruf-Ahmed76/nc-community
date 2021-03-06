import React, {useEffect, useState} from 'react';
import Header from './lib/Header';
import Footer from './lib/Footer';
import SearchForm from "./utils/SearchForm";
import SearchResult from "./utils/SearchResults";
import axios from "axios";

const Home = () => {
    let [searchQuery, setSearchQuery] = useState({
        id_cat : 'courseId',
        id : [],
        year : '2020',
        semester : 'Fall',
        type : 'Online'
    })
    let [resultPage, setResultPage] = useState(0);
    let [searchData, setSearchData] = useState(null);

    // Fetching data
    useEffect(() => {
        if(resultPage){
            axios.get("http://localhost:3000/cccourse/find",{
                params : {
                    "id_cat" : searchQuery.id_cat,
                    "CourseSubject" : searchQuery.id,
                    "classType" : searchQuery.type,
                    "year" : searchQuery.year,
                    "semester" : searchQuery.semester
                }
            })
            .then(res => {
                setSearchData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[resultPage])

    return (
        <>
            <Header/>
            {
                resultPage === 0 ? (
                        <SearchForm
                            searchQuery = {searchQuery}
                            setSearchQuery = {setSearchQuery}
                            setResultPage = {setResultPage}
                        />
                    ) :
                    (
                        <SearchResult searchQuery = {searchQuery} searchData = {searchData} setSearchQuery = {setSearchQuery} setResultPage = {setResultPage} setSearchData={setSearchData}/>
                    )
            }
            <Footer/>
            
        </>
    );
}

export default Home;