import { FC } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

// common
import Spinner from 'common/components/Spinner'

// log
import { QUERY_LOG_BY_ID } from 'Log/query'
import LogDetailsCard from './LogDetailsCard'
import LogDetailsTab from './LogDetailsTab'

const Log: FC = () => {
  const { logId } = useParams()
  const { data, error, loading } = useQuery(QUERY_LOG_BY_ID, {
    variables: {
      logId: logId,
    },
  })

  if (loading) {
    return <Spinner />
  }

  if (error || !data) {
    return <div>ERROR</div>
  }

  const log = data.logById

  return (
    <div className='w-full'>
      <LogDetailsCard log={log} />
      <LogDetailsTab events={log.block.events} />
    </div>
  )
}

export default Log