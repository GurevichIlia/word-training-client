import { FormGroup } from '@angular/forms';
export class CustomValidators {

  static matchPassword(pass: string, confirmPass: string) {

    return (form: FormGroup) => {

      const passValue = form.get(pass).value

      const confirmPassValue = form.get(confirmPass).value

      if (!passValue || !confirmPassValue) {
        return null
      }

      if (passValue === confirmPassValue) {
        form.get(confirmPass).setErrors(null)
        form.get(pass).setErrors(null)
        return null;
      } else {
        form.get(confirmPass).setErrors({ passNotMatch: true })
        form.get(pass).setErrors({ passNotMatch: true })
        return { passNotMatch: true }
      }


    }

  }
}
