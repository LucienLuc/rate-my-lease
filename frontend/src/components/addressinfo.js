
import React, { useState, useEffect } from "react"
import {Drawer, Button} from "antd"
import LeaseInfo from "./LeaseInfo"

const AddressInfo = ({key, lease}) => {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
      setVisible(true)
    }
    
    const onClose = () => {
      setVisible(false)
    }

    return (
        <>
            <Button onClick={showDrawer}>
                Open
            </Button>
            <Drawer
            title="Address"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={720}>
                <LeaseInfo lease = {lease}/>
            </Drawer>
        </>
    )
}

export default AddressInfo