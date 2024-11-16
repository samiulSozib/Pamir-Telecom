import React, { useState, useEffect } from "react";
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button, 
  Select,
  Checkbox, FormControlLabel,
  InputAdornment
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BlockIcon from "@mui/icons-material/Block";
import { setSubResellerPassword, changeSubResellerBalance, changeSubResellerStatus, deleteSubReseller,clearMessages, getSingleSubReseller } from '../../../redux/actions/subResellerAction';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import DialpadIcon from '@mui/icons-material/Dialpad';



const ITEM_HEIGHT = 48;

export default function ActionMenu({ subReseller,options }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user_info } = useSelector((state) => state.auth);
  const {error,message,loading,singleSubReseller}=useSelector((state)=>state.subResellerListReducer)

  const [openSetPassword, setOpenSetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState(null);

  const [openChangeBalance, setOpenChangeBalance] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [balanceError, setBalanceError] = useState(null);
  const { t, i18n } = useTranslation();

  const [openConfirmChangeStatus, setOpenConfirmChangeStatus] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);


  const isRtl = i18n.language === "ar" || i18n.language === "fa" || i18n.language === "ps"; 

  useEffect(()=>{
    dispatch(getSingleSubReseller(subReseller.id))
  },[dispatch,subReseller.id])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    handleCloseMenu();
    if (option.name === "Set Password") {
      setOpenSetPassword(true);
    } else if (option.name === "Change Balance") {
      setOpenChangeBalance(true);
    } else if (option.name === "Activate" || option.name === "Deactivate") {
      //setOpenConfirmChangeStatus(true);
      handleConfirmStatusChange()
    } else if (option.name === "Delete") {
      handleDeleteConfirmation();
    }
  };

  const handleCloseDialog = () => {
    setOpenSetPassword(false);
    setNewPassword("");
    setConfirmPassword("");
    setValidationError(null);
  };

  const handleCloseChangeBalanceDialog = () => {
    setOpenChangeBalance(false);
    setNewBalance("");
    setTransactionStatus("");
    setBalanceError(null);
  };

  const handleCloseConfirmChangeStatus = () => {
    setOpenConfirmChangeStatus(false);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleSetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }
    if (newPassword === "") {
      setValidationError("Please enter a password");
      return;
    }
    setValidationError(null);
    await dispatch(setSubResellerPassword(subReseller.id, newPassword, confirmPassword));
   
  };

  const handleCreditChange = () => {
    setTransactionStatus(transactionStatus === "credit" ? "" : "credit");
  };

  const handleDebitChange = () => {
    setTransactionStatus(transactionStatus === "debit" ? "" : "debit");
  };

  const handleChangeBalance = async () => {
    if (!newBalance || isNaN(newBalance)) {
      setBalanceError("Please enter a valid balance");
      return;
    }
    if (transactionStatus === "") {
      setBalanceError("Please select status");
      return;
    }
    setBalanceError(null);
    await dispatch(changeSubResellerBalance(subReseller.id, parseFloat(newBalance), transactionStatus));

    if (!balanceError) {
      handleCloseChangeBalanceDialog();
    }
  };

  const handleChangeStatusSubReseller = async () => {
    await dispatch(changeSubResellerStatus(subReseller.id));
    handleCloseConfirmChangeStatus();
  };

  const handleDeleteSubReseller = async () => {
    await dispatch(deleteSubReseller(subReseller.id));
    handleCloseConfirmDelete();
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: t('ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_RESELLER'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t('YES'),
      cancelButtonText: t('CANCEL'),
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteSubReseller(); 
      }
    });
  };

  const handleConfirmStatusChange = () => {
    const actionText = subReseller.status === 1 ? "Deactivate" : "Activate";
    const statusText = subReseller.status === 1 ? "deactivate" : "activate";
  
    Swal.fire({
      title: subReseller.status === 1?t('ARE_YOU_SURE_YOU_WANT_TO_DEACTIVE_THIS_RESELLER'):t('ARE_YOU_SURE_YOU_WANT_TO_ACTIVE_THIS_RESELLER'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t('YES'),
      cancelButtonText: t('CANCEL'),
    }).then((result) => {
      if (result.isConfirmed) {
        handleChangeStatusSubReseller(); // Execute the status change if confirmed
      }
    });
  };
  

  useEffect(() => {
    if ( message|| error) {
      if(message){
        Swal.fire({
          title: "Good job!",
          text: message,
          icon: "success"
        });
        if (openSetPassword) handleCloseDialog();
        if (openChangeBalance) handleCloseChangeBalanceDialog();
        if (openConfirmDelete) handleCloseConfirmDelete(); 
        if(openConfirmChangeStatus) handleCloseConfirmChangeStatus()
        dispatch(clearMessages())
        
      }
      if(error){
        setValidationError(error)
        dispatch(clearMessages())
      }
    }
  }, [message, error, dispatch,openSetPassword, openChangeBalance,openConfirmDelete,openConfirmChangeStatus]);
  

  return (
    <Box dir={isRtl ? "rtl" : "ltr"}>
      <IconButton
        aria-label="More"
        aria-owns={open ? "long-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu
        open={open}
        id="long-menu"
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}>

        {options.map((option) => (
          <MenuItem key={option.name} onClick={() => handleMenuItemClick(option)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Menu>

      {/* Dialog for Set Password */}
      <Dialog open={openSetPassword} onClose={handleCloseDialog} dir={isRtl?'rtl':'ltr'}>
        <DialogTitle>Set Password for {subReseller.reseller_name}</DialogTitle>
        <DialogContent>
          <TextField
            dir={isRtl ? 'rtl' : 'ltr'}
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DialpadIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
          dir={isRtl ? 'rtl' : 'ltr'}
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DialpadIcon />
                </InputAdornment>
              ),
            }}
          />
          {validationError && (
            <p style={{ color: "red" }}>{validationError}</p>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
              
          <Button sx={{marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'}} onClick={handleCloseDialog} variant="contained" color="secondary">Cancel</Button>
          <Button onClick={handleSetPassword} variant="contained">Set Password</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Change Balance */}
      <Dialog open={openChangeBalance} onClose={handleCloseChangeBalanceDialog} dir={isRtl?'rtl':'ltr'}>
        <DialogTitle>Change Balance for {subReseller.reseller_name}</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between">
            <TextField
            dir={isRtl ? 'rtl' : 'ltr'}
              autoFocus
              margin="dense"
              label={t('BALANCE')}
              type="number"
              fullWidth
              variant="outlined"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              sx={{
                [isRtl ? 'ml' : 'mr']: 1, 
              }}
              required
            />
            <TextField
            dir={isRtl ? 'rtl' : 'ltr'}
              margin="dense"
              label="Currency"
              fullWidth
              variant="outlined"
              value={user_info.currency_preference_code}
              sx={{
                [isRtl ? 'ml' : 'mr']: 1, 
              }}
              InputProps={{
                readOnly: true,
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
              }}
              required
            />
          </Box>
          <Box marginTop={2} display="flex" justifyContent="space-around" dir={isRtl?'rtl':'ltr'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={transactionStatus === "credit"}
                  onChange={handleCreditChange}
                  sx={{
                    color: transactionStatus === "credit" ? "green" : "",
                    "&.Mui-checked": { color: "green" }
                  }}
                />
              }
              label={t('CREDIT')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={transactionStatus === "debit"}
                  onChange={handleDebitChange}
                  sx={{
                    color: transactionStatus === "debit" ? "red" : "",
                    "&.Mui-checked": { color: "red" }
                  }}
                />
              }
              label={t('DEBIT')}
            />
          </Box>
          {balanceError && (
            <p style={{ color: "red" }}>{balanceError}</p>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
          <Button sx={{marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'}} onClick={handleCloseChangeBalanceDialog} variant="contained" color="secondary">{t('CANCEL')}</Button>
          <Button onClick={handleChangeBalance} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Confirm Change Status */}
      <Dialog  open={openConfirmChangeStatus} onClose={handleCloseConfirmChangeStatus} sx={{'& .MuiDialog-paper': {width: '500px', maxWidth: '600px',},
  }} dir={isRtl?'rtl':'ltr'}>
        <DialogTitle dir={isRtl?'rtl':'ltr'}>Confirm Status Change</DialogTitle>
        <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
          <Button sx={{marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'}} onClick={handleCloseConfirmChangeStatus} variant="contained" color="secondary">Cancel</Button>
          <Button onClick={handleChangeStatusSubReseller} variant="contained">
            {subReseller.status === 0 ? "Activate" : "Deactivate"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Confirm Delete */}
      {/* <Dialog open={openConfirmDelete} onClose={handleCloseConfirmDelete} sx={{'& .MuiDialog-paper': {width: '500px', maxWidth: '600px',},
  }} dir={isRtl?'rtl':'ltr'}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions sx={{ justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
          <Button sx={{marginLeft: isRtl ? '16px' : '0',
              marginRight: isRtl ? '0' : '16px'}} onClick={handleCloseConfirmDelete} variant="contained" color="secondary">Cancel</Button>
          <Button onClick={handleDeleteSubReseller} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}
