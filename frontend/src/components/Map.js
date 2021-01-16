import AddressInfo from './addressinfo';
import LeaseInfo from './LeaseInfo';

const PseudoMap = ({leases}) => {
  //leases is an array of [lease] objects
  leases = Object.values(leases)
  let counter = 0;
  return (
    <div>
      <h1>
        Leases
      </h1>
      <ul>
        {
          leases.map(lease => {
            counter++;
            return (
              <li key = {lease.id}> 
                <h2 key = {lease.id}> {"lease number " + counter + ": " + lease.name} </h2>
                <AddressInfo key = {lease.id} lease = {lease}/>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}


//once google api is implemented, we will be able to call this a real map
export default PseudoMap; //change the name of this later