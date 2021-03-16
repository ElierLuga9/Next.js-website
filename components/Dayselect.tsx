import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { format, addDays, parseISO } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { 
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(3,0)
    },
    week:{
      borderRadius: '22px',
      display: 'flex',
      padding: theme.spacing(0,1.2),
      backgroundColor:'#ADC6AC',
    },
    day: { 
      fontSize: 11,
      fontWeight:600,
      textAlign: 'center',
      [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(0.4,1.2),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.4,3.6),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0.4,4),
      }
    },
  })
)

type Props = {}

export const Dayselect = function (props: Props) {
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <div className={classes.week}>
        {[0, 1, 2, 3, 4, 5, 6].map((value) => (
        <div className={classes.day} key={value}>
          <div>
            <div>{format(addDays(parseISO(new Date().toISOString()), value), "iii")}</div>
            <div>{format(addDays(parseISO(new Date().toISOString()), value), "dd")}</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}