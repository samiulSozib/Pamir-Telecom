<TableRow key={index} hover>
                <TableCell colSpan={3} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={bundle.service.company.company_logo} />
                    <Paragraph>{bundle.bundle_title}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: "capitalize" }}>
                  {bundle.selling_price}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={3}>
                {bundle.validity_type.charAt(0).toUpperCase() + bundle.validity_type.slice(1)}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                {visibleRows[index] ? bundle.buying_price : "****"}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton onClick={() => handleVisibilityToggle(index)}>
                    {visibleRows[index] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </TableCell>
              </TableRow>



export const SET_SUB_RESELLER_PASSWORD_REQUEST='SET_SUB_RESELLER_PASSWORD_REQUEST'
export const SET_SUB_RESELLER_PASSWORD_SUCCESS='SET_SUB_RESELLER_PASSWORD_SUCCESS'
export const SET_SUB_RESELLER_PASSWORD_FAIL='SET_SUB_RESELLER_PASSWORD_FAIL'