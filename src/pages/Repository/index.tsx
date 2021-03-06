import React, { useEffect, useState } from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

import {Header, RepositoryInfo, Issues} from './styles'
import api from '../../services/api';


type RepositoryParams ={
  repository: string,
}

type Repositories = {
  full_name: string;
  description:string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner:{
    login: string;
    avatar_url:string;
  }
}
type Issue = {
  id:number;
  title: string;
  html_url: string;
  user : {
    login: string;
  }
}

const Repository:React.FC =()=> {
  const {params}= useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repositories | null >(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(()=>{
    api.get(`/repos/${params.repository}`).then(response=> {
      setRepository(response.data)
    })
    api.get(`/repos/${params.repository}/issues`).then(response=> {
      setIssues(response.data)
    })

  },[])
  return(
    <>
      <Header>
        <img src={logo}/>
        <Link to='/'>
          <FiChevronLeft
            size={16}
          />
          Voltar
        </Link>
      </Header>
     {repository && (
      <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt=""/>
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
     )}
      <Issues>
        {issues.map((issue) => (
            <a
              key={issue.id}
              target='blank'
              href= {issue.html_url}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20}/>
            </a>
          )
         )
        }
      </Issues>
   </>
  )
}
export default  Repository;
